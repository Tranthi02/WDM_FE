import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createService, getServices, updateService } from "../../api/service.api.js";
import { uploadServiceImage } from "../../api/file.api.js";
import { getFileBlobUrl } from "../../utils/index.js";
import balletImg from '../../assets/images/ballet.jpg';
import { FoodServiceContext } from "../../context/food.context.jsx"

const { Option } = Select;
// const { TextArea } = Input;

const ServiceContext = React.createContext(); 

const SContent = () => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [tempStatus, setTempStatus] = useState("OK");
    const [tempInventory, setInventory] = useState();
    const [tempFile, setTempFile] = useState(null)
    const isEdit = useRef(false)

    const { services, serviceSearchList, serviceOption } = useContext(FoodServiceContext)
    const [servicelists, setServiceLists] = useState(services);

    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setServiceLists(services)
    }, [services])

    useEffect(() => {
        if(serviceSearchList.length > 0) {
            setServiceLists(serviceSearchList)
        }
        else {
            setServiceLists(services)
        }
    }, [serviceSearchList])

    const prepareFileUploaded = (file) => {
        setTempFile(file)
    }

    const handleEdit = (service) => {

        setSelectedService(service);
        isEdit.current = true
        setTempFile()
        setTempName(service.name);
        setTempPrice(service.price.toString());
        setTempStatus(service.status ? "OK" : "NOT");
        setInventory(service.inventory)
        setModalVisible(true);
        
    };

    const showModal = () => {
        setTempFile()
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        setModalVisible(true);
        setFileList([]);
    };

    const handleOk = async () => {
        try{
            const updatedService = { name: tempName, price: Number(tempPrice), status: tempStatus==="OK", inventory: Number(tempInventory) };
         
            // console.log("updatedService", updatedService)
            let serviceData = {};
            let updatedServiceLists = {}
            if(isEdit.current) {
                const res = await updateService(selectedService.id, updatedService)

                serviceData = res.data
                setServiceLists(updatedServiceLists);
                if(tempFile) {                   
                    await uploadServiceImage(tempFile, serviceData.id)
                    const url = getFileBlobUrl(tempFile)
                    serviceData.url = url
                }
                serviceOption.updateServiceListItemById(serviceData.id, serviceData)
            }
            else {
                const res = await createService(updatedService)
                serviceData = res.data
                if(tempFile) {                    
                    await uploadServiceImage(tempFile, serviceData.id)
                    const url = getFileBlobUrl(tempFile)
                    serviceData.url = url
                }
                serviceOption.UpdateServiceListWithNewData(serviceData)
            }

            setModalVisible(false);
            setTempName("");
            setTempPrice("");
            setInventory()
            setTempStatus("OK");
            setFileList([]);
        } catch(error) {
            console.log(error.message);
        } finally {
            isEdit.current = false
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
        setTempName("");
        setTempPrice("");
        setInventory(null);
        setTempStatus("OK");
        isEdit.current = false;
        setFileList([]);
    };

    return (
        <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
            <div className="scontent">
                <div className="map_container">
                    <div className="service_box_add_service" onClick={showModal}>
                        <IoMdAddCircleOutline className="icon" />
                    </div>
                    {servicelists && servicelists.length > 0 && servicelists.map((service) => (
                        <div key={service.id} className="service_box">
                            <div className="service_img">
                                <img src={service.url ? service.url: balletImg} alt={service.name} className="image" />
                            </div>
                            <p className="title">{service.name}</p>
                            <p>{service.price}$</p>
                            <div className="actions">
                                <button className="edit" onClick={() => handleEdit(service)}>
                                    Edit
                                </button>
                                <button className="delete" onClick={() => serviceOption.delete(service.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal
                    open={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="save" type="primary" onClick={handleOk}>
                            Save
                        </Button>,
                    ]}
                    style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
                >
                    <ServiceModalContent 
                        tempName={tempName}
                        setTempName={setTempName}
                        tempPrice={tempPrice}
                        setTempPrice={setTempPrice}
                        tempStatus={tempStatus}
                        setTempStatus={setTempStatus}
                        tempInventory={tempInventory}
                        setInventory={setInventory}
                        prepareFileUploaded={prepareFileUploaded}
                        fileList={fileList}
                        setFileList={setFileList}
                    />
                </Modal>
            </div>
        </ServiceContext.Provider>
    );
};

const ServiceModalContent = (p) => {
    const { tempName, setTempName, tempPrice, setTempPrice, tempStatus, setTempStatus, tempInventory, setInventory, prepareFileUploaded, fileList, setFileList } = p
    // const { selectedService } = useContext(ServiceContext);

    return (
        <div>
            <Upload multiple={false} fileList={fileList}  maxCount={1} onChange={(e) => {
                const file = e.file.originFileObj
                file.filename = file.name
                prepareFileUploaded(file)
                setFileList([file])
            }}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <Input
                placeholder="Name"
                style={{ marginTop: 10 }}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
            />
            <Input
                placeholder="Price"
                style={{ marginTop: 10 }}
                prefix="VND"
                suffix="VND"
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
            />
            <Input
                placeholder="Inventory"
                style={{ marginTop: 10 }}
                value={tempInventory}
                onChange={(e) => setInventory(e.target.value)}
            />
            <Select
                defaultValue="OK"
                style={{ width: 120, marginTop: 10 }}
                value={tempStatus}
                onChange={(value) => setTempStatus(value)}
            >
                <Option value="OK">OK</Option>
                <Option value="NOT">NOT</Option>
            </Select>
        </div>
    );
};

export default SContent;
