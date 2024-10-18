import { Circle } from "rc-progress"

const Counter = ({ anxietyPercent, bipolarPercent, depressionPercent, schizophreniaPercent }) => {
    return (
        <>
            <div className="flex justify-evenly items-center w-full montserrat px-8 text-xs">
                <div className="px-8 py-5 shadow-lg w-[80%]">
                    <p className="text-xl font-semibold">Patient&apos;s Records:</p>
                    <div className="flex justify-between items-center gap-10 px-12 py-2">
                        <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                            <Circle percent={anxietyPercent} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                            <p>Anxiety</p>
                            <p className="absolute top-[3.2rem] text-lg font-semibold">{anxietyPercent} %</p>
                        </div>
                        <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                            <Circle percent={bipolarPercent} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                            <p>Bipolar Disorder</p>
                            <p className="absolute top-[3.2rem] text-lg font-semibold">{bipolarPercent} %</p>
                        </div>
                        <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                            <Circle percent={depressionPercent} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                            <p>Depression</p>
                            <p className="absolute top-[3.2rem] text-lg font-semibold">{depressionPercent} %</p>
                        </div>
                        <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                            <Circle percent={schizophreniaPercent} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                            <p>Schizophrenia</p>
                            <p className="absolute top-[3.2rem] text-lg font-semibold">{schizophreniaPercent} %</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Counter