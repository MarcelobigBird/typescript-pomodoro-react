import React from 'react';
import { useInterval } from '../hooks/use-interval';
// import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longeRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);

  React.useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
  }, [working, resting]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
  };

  function configureRest(long: boolean) {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);

    if (long) setMainTime(props.longeRestTime);
    setMainTime(props.shortRestTime);
  }

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWork()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        ></Button>
      </div>

      <div className="details">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias</p>
      </div>
    </div>
  );
}
