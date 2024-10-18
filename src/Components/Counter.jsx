import { Circle } from "rc-progress"

const Counter = () => {
    return (
        <>
            <div className="flex justify-evenly items-center w-full montserrat px-8 text-xs">
                <div className="flex justify-between items-center gap-10 px-20 py-10 shadow-md w-[80%]">
                    <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                        <Circle percent={0} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                        <p>Anxiety</p>
                        <p className="absolute top-[3.2rem] text-lg font-semibold">0 %</p>
                    </div>
                    <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                        <Circle percent={0} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                        <p>Bipolar Disorder</p>
                        <p className="absolute top-[3.2rem] text-lg font-semibold">0 %</p>
                    </div>
                    <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                        <Circle percent={0} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                        <p>Depression</p>
                        <p className="absolute top-[3.2rem] text-lg font-semibold">0 %</p>
                    </div>
                    <div className="w-1/4 h-auto flex justify-center items-center flex-col gap-4 relative">
                        <Circle percent={0} strokeColor="darkgreen" strokeWidth={10} trailColor="lightgreen" trailWidth={10} strokeLinecap="square" />
                        <p>Schizophrenia</p>
                        <p className="absolute top-[3.2rem] text-lg font-semibold">0 %</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Counter