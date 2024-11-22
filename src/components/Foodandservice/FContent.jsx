import React, { useState, useEffect, useRef, useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createFood, deleteFood, getFoods, updateFood } from "../../api/food.api.js";
import { uploadFoodImage } from "../../api/file.api.js"
import { getFileBlobUrl } from "../../utils/index.js";
import beefImg from '../../assets/images/beef.png';
import { FoodServiceContext } from "../../context/food.context.jsx"

const FoodContext = React.createContext();

const { Option } = Select;
// const { TextArea } = Input;

const FContent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const [tempName, setTempName] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [tempStatus, setTempStatus] = useState("OK");
    const [tempFile, setTempFile] = useState(null)
    const [tempInventory, setInventory] = useState()

    const { foods, foodSearchList, foodOption } = useContext(FoodServiceContext)
    const [foodlists, setFoodLists] = useState(foods)
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setFoodLists(foods)
    }, [foods])

    useEffect(() => {
        if(foodSearchList.length > 0) {
            setFoodLists(foodSearchList)
        }
        else {
            setFoodLists(foods)
        }
    }, [foodSearchList])

    const isEdit = useRef(false)
    
    const prepareFileUploaded = (file) => {
        setTempFile(file)
    }

    const handleEdit = (food) => {
        setSelectedFood(food);
        isEdit.current = true
        setTempName(food.name);
        setTempPrice(food.price.toString());
        setInventory(food.inventory)
        setTempStatus(food.status ? "OK" : "NOT");
        setModalVisible(true);
    };
    


    const handleOk = async () => {
        try{
            const updatedFood = { name: tempName, price: Number(tempPrice), status: tempStatus==="OK", inventory: Number(tempInventory) };
         
            // console.log("updatedFood", updatedFood)
            let foodData = {};
            if(isEdit.current) {
                const res = await updateFood(selectedFood.id, updatedFood)

                foodData = res.data
                if(tempFile) {                   
                    await uploadFoodImage(tempFile, foodData.id)
                    const url = getFileBlobUrl(tempFile)
                    foodData.url = url
                }
                foodOption.updateFoodListItemById(foodData.id, foodData)
            }
            else {
                const res = await createFood(updatedFood)
                foodData = res.data
                if(tempFile) {                  
                    await uploadFoodImage(tempFile, foodData.id)
                    const url = getFileBlobUrl(tempFile)
                    foodData.url = url
                }
                foodOption.UpdateFoodListWithNewData(foodData)
            }

            setModalVisible(false);
            setTempName("");
            setTempPrice("");
            setInventory()
            setTempStatus("OK");
            setFileList([]);
            

        } catch(error) {
            console.log(error.message);
            alert(error.message)
        } finally {
            isEdit.current = false
        }
    };
    
    const handleCancel = () => {
        setModalVisible(false);
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        isEdit.current = false;
        setFileList([]);
    };
    
    const showModal = () => {
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        setModalVisible(true);
        setFileList([]);
    };
    
    return (
        <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
            <div className="fcontent">
                <div className="map_container">
                    <div className="food_box_add_food" onClick={showModal}>
                        <IoMdAddCircleOutline className="icon" />
                    </div>
                    {foodlists && foodlists.length > 0 && foodlists.map((food) => (
                        <div key={food.id} className="food_box">
                            <div className="food_img">
                                <img src={food.url ? food.url : beefImg} alt={food.name} className="image" />
                            </div>
                            <p className="title">{food.name}</p>
                            <p>{food.price} VND</p>
                            <div className="actions">
                                <button className="edit" onClick={() => handleEdit(food)}>
                                    Edit
                                </button>
                                <button className="delete" onClick={() => foodOption.delete(food.id)}>
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
                    <FoodModalContent
                        tempName={tempName}
                        setTempName={setTempName}
                        tempPrice={tempPrice}
                        setTempPrice={setTempPrice}
                        tempStatus={tempStatus}
                        setTempStatus={setTempStatus}
                        prepareFileUploaded={prepareFileUploaded}
                        setInventory={setInventory}
                        tempInventory={tempInventory}
                        fileList={fileList}
                        setFileList={setFileList}
                        
                    />
                </Modal>
            </div>
        </FoodContext.Provider>
    );
};

const FoodModalContent = (p) => {
    const { tempName, setTempName, tempPrice, setTempPrice, tempStatus, setTempStatus, prepareFileUploaded,tempInventory, setInventory, fileList, setFileList  } = p
    // const { selectedFood } = useContext(FoodContext);



    return (
        <div>
            <Upload multiple={false} maxCount={1} fileList={fileList} onChange={(e) => {
                const file = e.file.originFileObj
                file.filename = file.name
                prepareFileUploaded(file)
                setFileList([file]);
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
                prefix="vnd"
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

export default FContent;
