import { useEffect, useState } from "react"
import Counter from "./Counter"
import SideBarDash from "./SideBarDash"
import Tests from "./Tests"

const Dashboard = () => {
  const [percentages, setPercentages] = useState({
    anxiety: 0,
    bipolar: 0,
    depression: 0,
    schizophrenia: 0,
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch('/patients', { credentials: 'include' });
        const data = await response.json();
        const totalPatients = data.length;

        const anxietyCount = data.filter(patient => patient.testType === 'anxiety').length;
        const bipolarCount = data.filter(patient => patient.testType === 'bipolar disorder').length;
        const depressionCount = data.filter(patient => patient.testType === 'depression').length;
        const schizophreniaCount = data.filter(patient => patient.testType === 'schizophrenia').length;

        setPercentages({
          anxiety: ((anxietyCount / totalPatients) * 100) || 0,
          bipolar: ((bipolarCount / totalPatients) * 100) || 0,
          depression: ((depressionCount / totalPatients) * 100) || 0,
          schizophrenia: ((schizophreniaCount / totalPatients) * 100) || 0,
        });
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  return (
    <>
      <div className="w-[100vw] h-[100vh] montserrat flex">
        <SideBarDash />
        <div className="flex flex-col">
          <Counter
            anxietyPercent={percentages.anxiety}
            bipolarPercent={percentages.bipolar}
            depressionPercent={percentages.depression}
            schizophreniaPercent={percentages.schizophrenia}
          />
          <Tests />
        </div>
      </div>
    </>
  )
}

export default Dashboard