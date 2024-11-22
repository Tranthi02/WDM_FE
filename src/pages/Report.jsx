import React, { useState, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { DatePicker, Divider, Statistic, Space, Typography, Radio } from "antd";
import { ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Line, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import Chart, { Interaction } from 'chart.js/auto';
import { getListRevenue, getTotalRevenue } from "../api/revenue.api"
import ExportCSVButton from "../components/ExportCSVBtn";
import Loading from "../components/Loading";
import { searchWeddingsByDateForReport } from "../api/wedding.api";
import WeddingCard from "../components/Report/ModalWedding";
import { formatVND } from "../utils";
import { Header } from "../components";
import Modal from '../components/Modal'
import ReactModal from "react-modal";


dayjs.extend(customParseFormat);

const { Text } = Typography;
const monthFormat = 'YYYY/MM';
const yearFormat = 'YYYY';

const Report = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [isExtraFee, setIsExtraFee] = useState(false)
  const [isLoad, setLoad] = useState(false)
  const newDate = new Date()
  const [dateReport, setDateReport] = useState({
    month: newDate.getMonth() + 1,
    year: newDate.getFullYear()
  })
  useEffect(() => {
    const fetchDataRevenue = async () => {
      setLoad(true)
      try{
        const year = dateReport.year
        const month = dateReport.month
        const res = await getListRevenue(isExtraFee, month, year);
        const totalRevenueData = await getTotalRevenue(year, month)
        setData(res.data)
        setTotalRevenue(totalRevenueData.data)
        setLoad(false)
      } catch(error) {
        setLoad(false)
        console.log(error.message);
      }

    }

    fetchDataRevenue()
  },[isExtraFee, dateReport])

  const handleToggleExtraFee = () => {
    setIsExtraFee(!isExtraFee)
  }

  if(data) {
    const newData = data.reverse()
    return (
      <Fragment>
        {isLoad && <Loading minsize="35px" />}
        <ReportInner 
          setDateReport={setDateReport}
          dateReport={dateReport}
          data={newData} 
          totalRevenue={totalRevenue} 
          isExtraFee={isExtraFee}
          handleToggleExtraFee={handleToggleExtraFee}
          />
      </Fragment>
    )
  }
}

const ReportInner = (p) => {
  const { data, totalRevenue, handleToggleExtraFee, setDateReport, dateReport, isExtraFee } = p
  const [showFollowBy, setShowFollowBy] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  const [ModalWedding, setModalWedding] = useState({
    state: false,
    data: []
  })

  const [getChart, setChart] = useState("1");

  const modalWeddingOption = {
    open:(data) => {
      if(data) {
        setModalWedding({ data, state: true })
      }
    },
    close:() => {
      setModalWedding({ data:[], state: false})
    }
  }

  const handleSettingClick = () => {
    setShowFollowBy(!showFollowBy);
  };
  // const handleRadioChange = (e) => {
  //   setShowMonthPicker(e.target.value === "month");
  // };
// 
  const handleDateChange = (date) => {
    const newDate = new Date(date.$d);

    // Get the month (getMonth() returns month from 0-11, so add 1 to match normal 1-12 format)
    const month = newDate.getMonth() + 1;

    // Get the year
    const year = newDate.getFullYear();

    setDateReport({month, year})
    setSelectedDate(date);
  };

  // const handleReloadClick = () => {
  //   window.location.reload();
  // };

  let filteredData = data.filter(item => {
    if (showMonthPicker) {
      return dayjs(item.day, "DD-MM-YYYY").format("YYYY-MM") === selectedDate.format("YYYY-MM");
    } else {
      return dayjs(item.day, "DD-MM-YYYY").format("YYYY") === selectedDate.format("YYYY");
    }
  });

  // filteredData = filteredData.reverse()

  const monthlyData = filteredData.reduce((acc, cur) => {
    const monthYear = dayjs(cur.day, "DD-MM-YYYY").format("MM/YYYY");
    if (!acc[monthYear]) {
      acc[monthYear] = { weddingNumber: 0, estimate_revenue: 0 };
    }
    acc[monthYear].weddingNumber += cur.weddingnumber;
    acc[monthYear].estimate_revenue += cur.estimate_revenue;
    return acc;
  }, {});


  const monthlyLabels = Object.keys(monthlyData);
  const monthlyWeddingNumbers = monthlyLabels.map(label => monthlyData[label].weddingNumber);
  const monthlyRevenues = monthlyLabels.map(label => monthlyData[label].estimate_revenue);
  const monthlyRealeRevenues = monthlyLabels.map(label => monthlyData[label].real_revenue);

  const totalYearlyRevenue = monthlyRevenues.reduce((acc, cur) => acc + cur, 0);
  const yearlyRatio = totalYearlyRevenue === 0 ? 0 : (totalYearlyRevenue / (showMonthPicker ? 32444 : 324440)).toFixed(2);

  const totalWeddingNumber = filteredData.reduce((acc, cur) => acc + cur.weddingnumber, 0);
  // const totalRevenue = filteredData.reduce((acc, cur) => acc + cur.estimate_revenue, 0);


  const ChartDataMonth = {
    labels: showMonthPicker ? filteredData.map(item => dayjs(item.day, "DD-MM-YYYY").format("DD")) : filteredData.map(item => dayjs(item.day, "DD-MM-YYYY").format("MM")),
    datasets: [
      {
        label: 'Wedding Number',
        data: filteredData.map(item => item.weddingnumber),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y1',
      },
      {
        label: 'Real Revenue',
        data: filteredData.map(item => item.real_revenue),
        fill: false,
        borderColor: 'rgb(7, 174, 18)',
        yAxisID: 'y',
      },
      {
        label: 'Estimate Revenue',
        data: filteredData.map(item => item.estimate_revenue),
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        yAxisID: 'y',
      }
    ],
  };
  const ChartDataYear = {
    labels: monthlyLabels,
    datasets: [
      {
        label: 'Wedding Number',
        data: monthlyWeddingNumbers,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        yAxisID: 'y1',
      },
      {
        label: 'Revenue',
        data: monthlyRevenues,
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        yAxisID: 'y',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Sales report',
        font: {
          size: 25
        }
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    onClick: async function(e, elements) {   
      const index = elements[0].index
      const date = e.chart.data.labels[index]

      const newDate = new Date(dateReport.year, dateReport.month - 1, date);

      console.log(newDate)

      return handleOpenModalList(newDate)
    }
  };

  const handleOpenModalList = async (newDate) => {
    try {
      const res = await searchWeddingsByDateForReport(newDate)

      modalWeddingOption.open(res.data)
    } catch (error) {
      alert(error.message)
    }
  }

  const chartRef = useRef();

  const tableRef = useRef(null);

  const setTbodyMaxHeight = () => {
    const table = tableRef.current;
    if (table) {
      const thead = table.querySelector('thead');
      const tfoot = table.querySelector('tfoot');
      const tbody = table.querySelector('tbody');

      // Get heights of thead and tfoot
      const theadHeight = thead.offsetHeight;
      const tfootHeight = tfoot.offsetHeight;

      // Calculate the max-height for tbody
      const tableHeight = table.offsetHeight;
      const tbodyMaxHeight = tableHeight - theadHeight - tfootHeight;

      // Set the max-height for tbody
      tbody.style.maxHeight = `${tbodyMaxHeight}px`;
    }
  };

  useEffect(() => {
    setTbodyMaxHeight();
    window.addEventListener('resize', setTbodyMaxHeight);

    return () => {
      window.removeEventListener('resize', setTbodyMaxHeight);
    };
  }, []);

  const modalStyle = {
    content: {
      width: 'auto',
      height: '800px',
      left: '50%',
      top: '50%',
      padding: 0,
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFF',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  };
  
  return (
    <Container>
      <Header
        handleAddBtnClick={() =>{}}
        headerTitle={'Report'}
        handleSearch={() => {}}
        action={false}
      />
      <main>
      <ReactModal
        isOpen={ModalWedding.state}
        onRequestClose={() => {
          modalWeddingOption.close()
        }}
        style={modalStyle}
      >
        <ModalWeddingList modalWeddingOption={modalWeddingOption} data={ModalWedding.data} isExtraFee={isExtraFee} />
      </ReactModal>
        <Card>
          <ActionBtn>
            {showMonthPicker ? (
                <DatePicker value={selectedDate} onChange={handleDateChange} picker="month"/>
              ) : (
                <DatePicker value={selectedDate} onChange={handleDateChange} picker="year" />
              )}
            <ShowExtraBtn onClick={handleToggleExtraFee}>{!isExtraFee? "show extra fee" : "Don't show extra fee"}</ShowExtraBtn>
            
              <ExportCSVButton data={data}>Export File</ExportCSVButton>
            
          </ActionBtn>
          <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row-reverse"
          }}>
  
            <Space align="baseline" style={{ marginBottom: 24, flexDirection: "column" }}>
              <Statistic title="Wedding Number" value={totalRevenue.weddingNum} />
              <Statistic title="Current Revenue" value={totalRevenue.realRevenue} prefix="VND" />
              <Statistic title="Estimate Revenue" value={totalRevenue.estimateRevenue} prefix="VND" />
            </Space>
          
            <LineChartContainer>
              <div className="inner">
                <Line data={ChartDataMonth} options={options} 
                // onClick={handleClickChart}
                ref={chartRef}/>
              </div>
            </LineChartContainer>
  
          </div>
          <TableContainerMonth>
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Wedding Number</th>
                  <th>Revenue (VND)</th>
                  <th>Real Revenue (VND)</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="table-column" onClick={() => {
                    const newDate = new Date(dateReport.year, dateReport.month - 1, item.day.split("-")[0]);
                    return handleOpenModalList(newDate)
                    }}>
                    <td>{index + 1}</td>
                    <td>{showMonthPicker ? dayjs(item.day, "DD-MM-YYYY").format("DD/MM") : dayjs(item.day, "DD-MM-YYYY").format("MM/YYYY")}</td>
                    <td>{item.weddingnumber}</td>
                    <td style={{ fontWeight: "600", color: "blue"}}>{formatVND(item.estimate_revenue)}</td>
                    <td style={{ fontWeight: "600", color: "green"}}>{formatVND(item.real_revenue)}</td>
                    <td>{item.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainerMonth>

        </Card>
      </main>
    </Container>
  );
};

const ModalWeddingList = (p) => {
  const { modalWeddingOption, data, isExtraFee } = p

  return (
    <ModalContainer>
    {data.length > 0 && <ContentWrapper>
        {/* <ModalOverlay onClick={modalWeddingOption.close}></ModalOverlay> */}
        <ModalElm>
          <ModalElmContent>

            <div className="header">
             <div> Date: {new Date(data[0].wedding_date).toLocaleDateString()}</div>
             <div> Quantity: {data.length > 0 ? data.length: 0}</div>
            </div>
            <div className="list_bill">
              {data.map(wedding => (
                <WeddingCard key={wedding.id} wedding={wedding} isExtraFee={isExtraFee}/>
              ))}
            </div>
          </ModalElmContent>
        </ModalElm>
      </ContentWrapper>}
    </ModalContainer>
  )
}

const Container = styled.div`
  // padding: 24px;
  height: 100vh;
  overflow: auto;

  main {
    height: 88vh;
    border-radius: var(--border-radius);
  }

  .ant-space {
    display: flex;
    height: 10%;
    justify-content: center;
    gap: 29px;
    margin: 0!important;
  }

  .ant-space-item {
    border-radius: 10px!important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px!important;
    padding: 10px!important;

    .ant-statistic-content-prefix {
      font-size: 0.8rem!important;
      font-style: italic!important;
    }

    .ant-statistic-title {
      font-weight: 700!important;
      color: #0f0537!important;
      font-size: 1.1rem!important;
    }

    .ant-statistic-content-value-int {
      font-size: 1.3rem!important;
      text-align: center;
    }

    .ant-statistic-content{
      text-align: center;
    }
  }
`;

// const Card1 = styled.div`
//   background-color: #fff;
//   border: 1px solid #d9d9d9;
//   border-radius: 2px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   margin-bottom: 24px;
// `;
const Card = styled.div`
    position: relative;
    display: flex;
    background-color: #fff;
    padding: 1rem 2rem;
    height: 100%;
    flex-direction: column;
`;
const TableContainerMonth = styled.div`
  flex: 1;
`;
const TableContainerYear = styled.div`
height: 25%;
`;
const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  .table-column {
    cursor: pointer;
    transition: all .2s linear;

    &:hover {
      background-color: #9cb8fd;
    }
  }
  th,
  td {
    padding: 8px;
  }

  thead th {
      position: sticky;
      top: 0;
      background-color: #1820F3;
      font-weight: bold;
      color: #f6f6f6;
  }

  tbody {
      display: block;
      max-height: 200px;
      overflow-y: auto;
  }

  tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed; /* Optional: helps with column width consistency */
  }

  thead, tbody tr {
      display: table;
      width: 100%;
      table-layout: fixed; /* This makes sure all columns are of equal size */
  }

  /* Ensure the table width is set and borders if needed */
  table, th, td {
    border: 1.5px solid #97caff;
    text-align: center;
  }

  th {
    border: 2px solid #000000;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;



const FollowByBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-top: 16px;
`;
const LineChartContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex: 1;
  .inner {
    max-width: 1000px;
    width: 100%;
  }

`;
const ShowExtraBtn = styled.button`
    background-color: #1a00ff;
    padding: 10px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
`
const ActionBtn = styled.button`
    display: flex;
    height: 5%;
    align-items: center;
    gap: 10px;
    width: 100%;
    justify-content: flex-start;
`

const ModalContainer =styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
`
const ContentWrapper =styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalOverlay = styled.div `
  background-color: #6f6f6f;
  opacity: .6;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  position: absolute;
  
`

const ModalElm = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: white;
  border-radius: 10px;
  padding: 18px 16px;
`
const ModalElmContent = styled.div`
  width: 100%;
  height: 100%;
  
  .header  {
    padding: 10px 21px;
    font-weight: 500;
    display:flex;
    font-size: 1.4rem;
    justify-content: space-between;
  }
  
  .list_bill {
    overflow-y: scroll;
    overflow-y: scroll;
    height: 90%;

  }

`

export default Report;


