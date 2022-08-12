import CSS from "csstype";
import { useLocale } from "../../hooks/useLocale";
const textAreaStyle: CSS.Properties = {
  boxShadow: "0 0 2pt grey",
};
export const DailyWage = () => {
  return (
    <>
      <select
        name="daily_wage"
        id="daily_wage"
        className="rounded-md outline-none border-none"
        style={textAreaStyle}
      >
        <option value="1">~299</option>
        <option value="2">299 ~ 349</option>
        <option value="3">349 ~ 449</option>
        <option value="4">449~</option>
      </select>
    </>
  );
};

export const HoulyWage = () => {
  return (
    <>
      <select
        name="hourly_wage"
        id="hourly_wage"
        className="rounded-md outline-none border-none"
        style={textAreaStyle}
      >
        <option value="1">~40</option>
        <option value="2">40 ~ 59</option>
        <option value="3">60 ~ 79</option>
        <option value="4">80~</option>
      </select>
    </>
  );
};

export const WeeklyWage = () => {
  return (
    <>
      <select
        name="weekly_wage"
        id="weekly_wage"
        className="rounded-md outline-none border-none"
        style={textAreaStyle}
      >
        <option value="1">~1499</option>
        <option value="2">1500 ~ 1799</option>
        <option value="3">1800 ~ 2099</option>
        <option value="4">2100~</option>
      </select>
    </>
  );
};

export const BiWeeklyWage = () => {
  return (
    <>
      <select
        name="biweekly_wage"
        id="biweekly_wage"
        className="rounded-md outline-none border-none"
        style={textAreaStyle}
      >
        <option value="1">~2999</option>
        <option value="2">3000 ~ 4999</option>
        <option value="3">5000 ~ 6999</option>
        <option value="4">7000~</option>
      </select>
    </>
  );
};

export const MonthlyWage = () => {
  return (
    <>
      <select name="monthly_wage" id="monthly_wage">
        <option value="1">~7999</option>
        <option value="2">8000 ~ 9909</option>
        <option value="3">10000 ~ 11999</option>
        <option value="4">12000~</option>
      </select>
    </>
  );
};
