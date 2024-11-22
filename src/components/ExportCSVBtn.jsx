import React from 'react';
import styled from 'styled-components';

const ExportCSVButton = (p) => {
    const { children, data } = p


    const headers = [ 
        { label: "Date", key: "day" },
        { label: "Wedding Number", key: "weddingnumber" },
        { label: "Estimated Revenue (VND)", key: "estimate_revenue" },
        { label: "Real Revenue (VND)", key: "real_revenue" },
        { label: "Ratio (%)", key: "ratio" },
    ];

    const convertToCSV = (objArray) => {
        const array = objArray.map(row => headers.map(field => `"${row[field.key]}"`));
        const csv = [
            headers.map(field => field.label).join(','), // header row first
            ...array.map(row => row.join(',')) // data rows
        ].join('\n');

        return csv;
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(data);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'wedding-revenue-data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button onClick={downloadCSV}>
            {children}
        </Button>
    );
};

export default ExportCSVButton;


const Button = styled.button`
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ffb300;
  }
`;