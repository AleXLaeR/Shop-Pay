import Countdown, { CountdownRenderProps, CountdownProps } from 'react-countdown';

function countDownRenderer({ days, hours, minutes, seconds }: CountdownRenderProps) {
  const daysInHours = hours + days * 7;

  const paddedHours = daysInHours
    .toString()
    .padStart(daysInHours < 100 ? 2 : daysInHours < 1e3 ? 3 : 4, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1">
      {Array.from(paddedHours).map((hour, idx) => (
        <span key={idx} className="text-[1.5rem] w-7 bg-black-lighter text-white p-2 rounded-md">
          {hour}
        </span>
      ))}
      <b className="text-xl">:</b>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedMinutes[0]}
      </span>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedMinutes[1]}
      </span>
      <b className="text-xl">:</b>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedSeconds[0]}
      </span>
      <span className="w-7 bg-black-lighter text-white p-2 rounded-md text-[1.5rem]">
        {paddedSeconds[1]}
      </span>
    </div>
  );
}

export default function CountDown({ date, renderer, ...countdownProps }: CountdownProps) {
  return <Countdown date={date} renderer={renderer ?? countDownRenderer} {...countdownProps} />;
}
