import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Select from "react-select";

const options = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
];


const DrawerMenu = ({ isOpen, toggleClose }) => {
    const [segment, setSegment] = useState("");
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [initialOptions, setInitialOptions] = useState(options);
    const [newSchema, setNewSchema] = useState(null);
    const handleChange = (selectedOption) => {
        setNewSchema(selectedOption);
        const chosenValues = [...selectedSchemas, selectedOption].map(
            (option) => option.value
        );
        const result = options.filter(
            (option) => !chosenValues.includes(option.value)
        );
        setInitialOptions(result);
    };

    const addNewSchema = () => {
        if (newSchema) {
            setSelectedSchemas([...selectedSchemas, newSchema]);
            setNewSchema(null);
        }
    };


    const saveSegment = () => {
        const schema = selectedSchemas.map((selectedSchema) => ({
            [selectedSchema.value]: selectedSchema.label,
        }));
        const finalData = {
            segment_name: segment,
            schema: schema,
        };
        const postUrl = "https://webhook.site/1f7a4c4e-87b6-4bf3-90b8-698a92f663f2";
        fetch(postUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalData),
        }).then(() => {
            setSegment("");
            setSelectedSchemas([]);
            setInitialOptions(options);
            toggleClose();
        });
    };
    return (
        <div>
            <Drawer PaperProps={{
                sx: { width: "30%" },
            }} anchor="right" open={isOpen} onClose={toggleClose}>
                <div className="">
                    <div className="w-full bg-[#32c1ae] py-5 px-10 flex items-center">
                        <i class="fa-solid fa-arrow-left mr-10 cursor-pointer mt-1 text-white flex items-center"></i>
                        <p className="font-bold text-xl text-white">Saving Segment</p>
                    </div>
                    <h2 className="capitalize my-8 text-xl mx-4">
                        Enter the name of the segment
                    </h2>
                    <p className='ml-5 text-lg'>To save your segment, you need to add the schemes to build the query</p>
                    <div className="mx-6 my-6">
                        <input
                            type="text"
                            required
                            className="border w-full p-4 border-gray-500"
                            placeholder="Name of the segment"
                            value={segment}
                            onChange={(e) => setSegment(e.target.value)}
                        />
                    </div>
                    <div className="mx-6">
                        {selectedSchemas.map((schema, index) => (
                            <div key={index} className="my-5">
                                <Select
                                    options={initialOptions}
                                    value={schema}
                                    onChange={(selectedOption) => {
                                        const updatedSchemas = [...selectedSchemas];
                                        updatedSchemas[index] = selectedOption;
                                        setSelectedSchemas(updatedSchemas);
                                        const chosenValues = updatedSchemas.map(
                                            (option) => option.value
                                        );

                                        const result = options.filter(
                                            (option) => !chosenValues.includes(option.value)
                                        );
                                        setInitialOptions(result);
                                    }}
                                    isClearable
                                />
                            </div>
                        ))}

                        <Select
                            options={initialOptions}
                            value={newSchema}
                            onChange={handleChange}
                            placeholder="Add Schema to segment"
                            isClearable
                        />
                    </div>
                    <button
                        className="my-5 mx-4 font-bold text-[#32c1ae]"
                        onClick={addNewSchema}
                    >
                        + <span className='underline'>Add new schema</span>
                    </button>
                    <div className="flex items-center gap-10 p-6 bg-[#e3e3e3] absolute bottom-0 right-0 left-0">
                        <button
                            className="px-6 py-2 bg-[#38aa71] text-white rounded text-lg font-medium"
                            onClick={() => {
                                saveSegment();
                            }}
                        >
                            Save the segment
                        </button>
                        <button
                            className="text-red-800 bg-white px-7 py-2 rounded text-lg font-medium"
                            onClick={() => {
                                setSegment("");
                                setSelectedSchemas([]);
                                setInitialOptions(options);
                                toggleClose()
                            }}
                        >
                            cancel
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerMenu;
