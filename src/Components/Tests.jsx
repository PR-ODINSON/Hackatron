import { useState } from "react";
import { Circle } from "rc-progress"
import { useNavigate } from "react-router-dom";

const Tests = () => {
    const [patientType, setPatientType] = useState('new');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [testType, setTestType] = useState('');
    const [contact, setContact] = useState('');
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const [percentages, setPercentages] = useState({
        anxiety: 0,
        bipolar: 0,
        depression: 0,
        schizophrenia: 0,
    });

    const fetchPatientData = async () => {
        try {
            const response = await fetch('/patients', { credentials: 'include' });
            const data = await response.json();
            const totalPatients = data.length;

            const anxietyCount = data.filter(patient => patient.testType === 'anxiety').length;
            const bipolarCount = data.filter(patient => patient.testType === 'bipolar disorder').length;
            const depressionCount = data.filter(patient => patient.testType === 'depression').length;
            const schizophreniaCount = data.filter(patient => patient.testType === 'schizophrenia').length;

            const newPercentages = {
                anxiety: ((anxietyCount / totalPatients) * 100) || 0,
                bipolar: ((bipolarCount / totalPatients) * 100) || 0,
                depression: ((depressionCount / totalPatients) * 100) || 0,
                schizophrenia: ((schizophreniaCount / totalPatients) * 100) || 0,
            }

            setPercentages(newPercentages);
            console.log(newPercentages);
        } catch (error) {
            console.log("Error fetching patient data:", error);
        }
    };
    fetchPatientData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('patientType', patientType);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('gender', gender);
        formData.append('testType', testType);
        formData.append('contact', contact);
        if (file) formData.append('file', file);

        try {
            const response = await fetch('/patients', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                alert('Patient data submitted successfully');
                setPatientType('new');
                setName('');
                setAge('');
                setEmail('');
                setGender('');
                setTestType('');
                setContact('');
                setFile(null);
                navigate('/recommendation', { state: { testType } });
            } else {
                alert('Error submitting patient data');
            }
        } catch (error) {
            console.error('Error submitting patient data:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-3 justify-center items-center h-screen w-full montserrat">
                <div className="flex justify-evenly items-center w-full montserrat px-8 text-xs">
                    <div className="px-8 py-5 shadow-lg w-[80%]">
                        <p className="text-xl font-semibold">Patient&apos;s Records:</p>
                        <div className="flex justify-between items-center gap-10 px-12 py-2">
                            <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                                <Circle percent={percentages.anxiety} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                                <p>Anxiety</p>
                                <p className="absolute top-[3.2rem] text-lg font-semibold">{percentages.anxiety} %</p>
                            </div>
                            <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                                <Circle percent={percentages.bipolar} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                                <p>Bipolar Disorder</p>
                                <p className="absolute top-[3.2rem] text-lg font-semibold">{percentages.bipolar} %</p>
                            </div>
                            <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                                <Circle percent={percentages.depression} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                                <p>Depression</p>
                                <p className="absolute top-[3.2rem] text-lg font-semibold">{percentages.depression} %</p>
                            </div>
                            <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                                <Circle percent={percentages.schizophrenia} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                                <p>Schizophrenia</p>
                                <p className="absolute top-[3.2rem] text-lg font-semibold">{percentages.schizophrenia} %</p>
                            </div>
                        </div>
                    </div>
                </div>


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
                                        <option value="bipolar">Bipolar Disorder</option>
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