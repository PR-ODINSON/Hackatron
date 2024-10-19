import normal from "../assets/images/Normal.png"
import anxiety from "../assets/images/Anxiety.png"
import bipolar from "../assets/images/Bipolar.png"
import schizophrenia from "../assets/images/Sizo.png"
import depression from "../assets/images/Depression.jpg"
import { useLocation, useNavigate } from 'react-router-dom';

const Recommendation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { testType } = location.state || {};
    console.log(testType)

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-green-400 montserrat">
                <div className="bg-green-200 flex justify-between items-start flex-col p-6 rounded-lg shadow-lg w-[90%] h-[80%]">
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
                        <div className="flex justify-evenly items-center flex-col w-2/3 h-full p-8 gap-3">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full hover:bg-gray-100 transition duration-300">
                                <div className="flex items-center mb-4">
                                    <i className="fas fa-lightbulb text-xl mr-2"></i>
                                    <h2 className="text-xl font-bold">Do&apos;s</h2>
                                </div>
                                <p className="text-gray-700">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident cupiditate accusamus debitis, a, animi iusto odit cum nesciunt amet hic nostrum repellendus placeat? Ipsa dolor magni id. Earum inventore aut nostrum aperiam quas debitis nesciunt voluptatem. Dolorem libero est fuga.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full hover:bg-gray-100 transition duration-300">
                                <div className="flex items-center mb-4">
                                    <i className="fas fa-lightbulb text-xl mr-2"></i>
                                    <h2 className="text-xl font-bold">Don&apos;t</h2>
                                </div>
                                <p className="text-gray-700">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt veritatis, voluptatibus adipisci dolorem deleniti nulla vero mollitia! Voluptates, illo similique sit eaque debitis modi quaerat in, ducimus voluptatum natus magnam officia possimus! Earum dignissimos officiis aspernatur minus perspiciatis, iusto iste.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recommendation