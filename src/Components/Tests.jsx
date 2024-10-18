import { useState } from "react";

const Tests = () => {
    const [patientType, setPatientType] = useState('new');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [testType, setTestType] = useState('');
    const [contact, setContact] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contact', contact);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('patientType', patientType);
        formData.append('testType', testType);
        if (file) {
            formData.append('file', file);
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch('/patients', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); 
            } else {
                alert(data.message); 
            }
        } catch (error) {
            console.error("Error submitting patient details:", error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen w-full montserrat">
                <div className="bg-white p-6 flex justify-center items-center rounded-lg shadow-lg w-[75%]">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-wrap justify-between text-sm gap-4 w-full">
                            <div className="w-full">
                                <h1 className="text-xl font-semibold tracking-wide">Patient Details:</h1>
                                <div className="mt-5 flex gap-12 text-sm">
                                    <label>
                                        <input
                                            type="radio"
                                            value="new"
                                            checked={patientType === 'new'}
                                            name="patientType"
                                            onChange={() => setPatientType('new')}
                                        />
                                        New Patient
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="existing"
                                            checked={patientType === 'existing'}
                                            name="patientType"
                                            onChange={() => setPatientType('existing')}
                                        />
                                        Existing Patient
                                    </label>
                                </div>
                            </div>
                            <div className="w-full flex gap-4">
                                <div className="flex flex-col w-2/3 gap-1">
                                    <label >Name:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        name="name"
                                        onChange={(e) => setName(e.target.value)}
                                        className="input border-[1px] border-gray-300 outline-none px-3 py-1 rounded-md"
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-1/3 gap-1">
                                    <label>Age:</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input border-[1px] border-gray-300 outline-none px-3 py-1 rounded-md"
                                        placeholder="Enter age"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="w-full flex gap-4">
                                <div className="flex flex-col w-2/3 gap-1">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input border-[1px] border-gray-300 outline-none px-3 py-1 rounded-md"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-1/3 gap-1">
                                    <label>Gender:</label>
                                    <select
                                        value={gender}
                                        name="gender"
                                        onChange={(e) => setGender(e.target.value)}
                                        className="input border-[1px] border-gray-300 outline-none px-3 py-1 rounded-md"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="w-full">
                                <div className="flex flex-col w-2/3 gap-1">
                                    <label>Contact:</label>
                                    <input
                                        type="number"
                                        value={contact}
                                        name="contact"
                                        onChange={(e) => setContact(e.target.value)}
                                        className="input border-[1px] border-gray-300 outline-none px-3 py-1 rounded-md"
                                        placeholder="Enter contact number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full flex gap-6">
                                <div className="flex flex-col w-1/2 gap-1">
                                    <label>Test Type:</label>
                                    <select
                                        value={testType}
                                        name="testType"
                                        onChange={(e) => setTestType(e.target.value)}
                                        className="input border-[1px] border-gray-300 outline-none px-3 py-1 rounded-md"
                                        required
                                    >
                                        <option value="">Select Test Type</option>
                                        <option value="anxiety">Anxiety</option>
                                        <option value="bipolar disorder">Bipolar Disorder</option>
                                        <option value="depression">Depression</option>
                                        <option value="schizophrenia">Schizophrenia</option>
                                    </select>
                                </div>
                                <div className="flex flex-col w-1/2 gap-1">
                                    <label>File Inclusion:</label>
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="input"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Tests