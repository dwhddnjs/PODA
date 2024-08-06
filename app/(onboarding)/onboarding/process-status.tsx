export const ProcessStatus = ({ index }: { index: number }) => {
  const currentProcess = index
  const lightOn = <span className="rounded-lg w-2 h-2 bg-gray-200"></span>
  const lightOff = <span className="rounded-lg w-2 h-2 bg-gray-500"></span>

  return (
    <div className="relative bottom-6 ml-auto mr-auto">
      <div className=" mt-32 flex  gap-4">
        {currentProcess === 0 ? lightOn : lightOff}
        {currentProcess === 1 ? lightOn : lightOff}
        {currentProcess === 2 ? lightOn : lightOff}
      </div>
    </div>
  )
}
