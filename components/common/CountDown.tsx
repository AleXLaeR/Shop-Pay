import Countdown, { CountdownRenderProps, CountdownProps } from 'react-countdown';

function countDownRenderer({ hours, minutes, seconds }: CountdownRenderProps) {
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1">
      <span className="text-[1.5rem] w-7 bg-black-lighter text-white p-2 rounded-md">
        {paddedHours.toString()[0]}
      </span>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedHours.toString()[1]}
      </span>
      <b className="text-xl">:</b>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedMinutes.toString()[0]}
      </span>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedMinutes.toString()[1]}
      </span>
      <b className="text-xl">:</b>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedSeconds.toString()[0]}
      </span>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedSeconds.toString()[1]}
      </span>
    </div>
  );
}

export default function CountDown({ date, renderer, ...countdownProps }: CountdownProps) {
  return <Countdown date={date} renderer={renderer ?? countDownRenderer} {...countdownProps} />;
}
