import normal from "../assets/images/Normal.png"
import anxiety from "../assets/images/Anxiety.png"
import bipolar from "../assets/images/Bipolar.png"
import schizophrenia from "../assets/images/Sizo.png"
import depression from "../assets/images/Depression.jpg"
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import axios from "axios"

const Recommendation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { testType, file } = location.state || {};
    console.log(testType)
    const [dos, setDos] = useState([]);
    const [donts, setDonts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const formData = new FormData();
                formData.append('file', file); // Replace with the actual file if needed
                formData.append('model_name', testType);

                const response = await axios.post('http://localhost:5000/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const { prediction, recommendations } = response.data;

                // Extract Do's and Don'ts from recommendations
                if (recommendations) {
                    setDos(recommendations["Do's"] || []);
                    setDonts(recommendations["Don'ts"] || []);
                }
            } catch (err) {
                setError(err.response ? err.response.data.error : 'An error occurred while fetching recommendations.');
            }
        };

        if (testType) {
            fetchRecommendations();
        }
    }, [testType]);


    return (
        <>
            <div className="flex items-center justify-center h-screen bg-green-400 montserrat">
                <div className="bg-green-200 flex justify-between items-start flex-col p-6 rounded-lg shadow-lg w-[90%] h-[90%]">
                    <div className="w-2/3 flex justify-between">
                        <button onClick={() => navigate('/dashboard')} className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded">Back</button>
                        <h1 className="text-center text-3xl font-bold mb-4">Recommendation Engine</h1>
                    </div>
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex justify-evenly items-center flex-col w-1/3 h-full">
                            <div className="w-full h-1/2 flex justify-center items-center">
                                < img width={350} height={120}
                                    src={normal}
                                    alt="Placeholder image"

                                />
                            </div>
                            <div className="w-full h-1/2 flex justify-center items-center">
                                <img width={300} height={120}
                                    src={testType === 'normal' ? normal : testType === 'anxiety' ? anxiety : testType === 'bipolar' ? bipolar : testType === 'schizophrenia' ? schizophrenia : testType === 'depression' ? depression : normal}
                                    alt="Placeholder image"
                                />
                            </div>
                        </div>
                        <div className="flex justify-evenly items-center flex-col w-2/3 h-full px-8 gap-3">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full hover:bg-gray-100 transition duration-300 ">
                                <div className="flex items-center mb-4">
                                    <i className="fas fa-lightbulb text-xl mr-2"></i>
                                    <h2 className="text-xl font-bold">Do&apos;s</h2>
                                </div>
                                <ul style={{ listStyleType: 'disc' }} className="text-gray-700 overflow-scroll">
                                    {dos.length > 0 ? dos.map((item, index) => (
                                        <li key={index} className="mb-2 text-sm">{item}</li>
                                    )) : <li>No recommendations available.</li>}
                                </ul>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full hover:bg-gray-100 transition duration-300 ">
                                <div className="flex items-center mb-4">
                                    <i className="fas fa-lightbulb text-xl mr-2"></i>
                                    <h2 className="text-xl font-bold">Don&apos;t</h2>
                                </div>
                                <ul style={{ listStyleType: 'disc' }} className="text-gray-700 overflow-scroll">
                                    {donts.length > 0 ? donts.map((item, index) => (
                                        <li key={index} className="mb-2 text-sm">{item}</li>
                                    )) : <li>No recommendations available.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recommendation