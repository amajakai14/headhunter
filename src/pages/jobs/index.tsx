import {
  DailyWage,
  HoulyWage,
  WeeklyWage,
  BiWeeklyWage,
  MonthlyWage,
} from '../../components/conditions/WageRange';

import Navbar from '../../components/Navbar';
import { ChangeEvent, useEffect, useState } from 'react';
import WorkingArea from '../../components/conditions/WorkingArea';
import CSS from 'csstype';
import { jobList, JOBLIST } from '../../data/joblist';
import Link from 'next/link';
import { useLocale } from '../../hooks/useLocale';
import { trpc } from '../../utils/trpc';
export interface SearchCondition {
  zipcode: number | null;
  province_code: number | null;
  district_code: number | null;
  amphoe_code: number | null;
  job_type: number | null;
}

function EmployeesPage() {
  const { t } = useLocale();
  const [wageType, setWageType] = useState('hourly');
  const [job, setJob] = useState<JOBLIST[]>([]);

  const getJobCategory = trpc.useQuery(['jobcatagory.getalljobCategory']);

  const handleWageType = (e: ChangeEvent<HTMLSelectElement>) => {
    setWageType(e.target.value);
  };

  const RenderWageRange = () => {
    switch (wageType) {
      case 'hourly':
        return <HoulyWage />;
      case 'daily':
        return <DailyWage />;
      case 'weekly':
        return <WeeklyWage />;
      case 'biweekly':
        return <BiWeeklyWage />;
      case 'monthly':
        return <MonthlyWage />;
      default:
        return <></>;
    }
  };
  useEffect(() => {}, [wageType]);
  const textAreaStyle: CSS.Properties = {
    boxShadow: '0 0 2pt grey',
  };
  const handleSubmit = () => {
    console.log(jobList);
    const ZipCode: string = (
      document.getElementById('ZipCode') as HTMLInputElement
    )?.value;
    const Province: string = (
      document.getElementById('Province') as HTMLSelectElement
    )?.value;

    const Amphoe: string = (
      document.getElementById('SubDistrict') as HTMLSelectElement
    )?.value;
    const District: string = (
      document.getElementById('District') as HTMLSelectElement
    )?.value;
    const JobType: string = (
      document.getElementById('job_type') as HTMLSelectElement
    )?.value;
    const inputData: SearchCondition = {
      zipcode: parseInt(ZipCode),
      province_code: parseInt(Province),
      district_code: parseInt(District),
      amphoe_code: parseInt(Amphoe),
      job_type: parseInt(JobType),
    };
    const findJob = jobList.filter(
      (job) =>
        job.zipcode === inputData.zipcode &&
        job.province_code === inputData.province_code &&
        job.job_type === inputData.job_type
    );
    console.log(findJob);
    setJob(findJob);
  };
  return (
    <>
      <Navbar />
      <div className="text-3xl">
        &lt; DEMO Work ทำไว้แค่สองชุด ใส่รหัสปณ 11120 สลับประเภทงาน ก ข &gt;
      </div>
      <div>
        <div>ผู้ต้องการหางาน</div>
        <div className="">
          <div className="flex px-4">
            <div>
              <span className="px-2">{t.Jobs.WageType}</span>
              <select
                name="wage_types"
                id="wage_types"
                onChange={(e) => handleWageType(e)}
                className="rounded-md outline-none border-none"
                style={textAreaStyle}
              >
                <option value="hourly">รายชั่วโมง</option>
                <option value="daily">รายวัน</option>
                <option value="weekly">รายสัปดาห์</option>
                <option value="biweekly">รายสองสัปดาห์</option>
                <option value="monthly">รายเดือน</option>
              </select>
            </div>
            <div className="flex px-4">
              <span className="px-2">{t.Jobs.WageRange}</span>
              <RenderWageRange />
            </div>
          </div>
          <div>
            <div>สถานที่ทำงาน</div>
            <WorkingArea />
            <div className="flex">
              <span className="px-2">{t.WorkingArea.JobFunction}</span>
              <select
                name="job_type"
                id="job_type"
                className="rounded-md outline-none border-none"
                style={textAreaStyle}
              >
                {getJobCategory.data?.map((val, index) => (
                  <option value={val.job_id} key={`jobCata${index}`}>
                    {val.job_Category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-300 p-2 rounded-full hover:opacity-70 "
      >
        Search
      </button>
      {/* งาน */}
      {job.length === 0 ? <div>Work not Found!</div> : <div>Found a Job!</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        {job &&
          job.map((j, index) => {
            return (
              <Link href="#" key={`company_link${index}`}>
                <div
                  className="bg-green-300 rounded-2xl p-2 shadow-md transition shadow-black focus:scale-95  active:scale-95 active:shadow-sm"
                  key={`jobContainer${index}`}
                >
                  <div key={`comp_${index}`}>ชื่อบริษัท{j.company_name}</div>
                  <div key={`jd_${index}`}>
                    รายละเอียดงาน {j.job_description}
                  </div>
                  <div key={`wage_offer${index}`}>ค่าแรง:{j.wage}</div>
                  <div
                    key={`company_address${index}`}
                  >{`ข้อมูลที่อยู่บริษัท จังหวัด:${j.province} ตำบล:${j.district} อำเภอ:${j.amphoe}`}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export default EmployeesPage;
