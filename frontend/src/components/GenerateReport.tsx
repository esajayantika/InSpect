import { useState } from "react";
import { analizeVariance } from "../utils/analyzeVariance";
import type { Report, ItemData } from "../types";

type GenerateReportProps = {
  listdata: ItemData[];
};

const GenerateReport = ({ listdata }: GenerateReportProps) => {
  const [reports, setReports] = useState<Report[] | null>(null);

  const handleVariance = () => {
    // cek satu2 objek aray data item menggunakan analizevariance
    const checkItems = listdata.map((item) => {
      return analizeVariance(item);
    });

    // masukin ke dalam aray report
    setReports(checkItems);
  };

  return (
    <div>
      <h1>Report Variance</h1>
      <button className="btn-generate" type="button" onClick={handleVariance}>
        Generate
      </button>

      {reports &&
        reports.map((report, index) => (
          <div className="var-result" key={index}>
            <h4>Variance Report ID: {index}</h4>
            <div>
              <p>Item Sku : {report.sku}</p>
              <p>Name : {report.name}</p>
            </div>
            <div className="var-group">
              <p>Total Variance :</p>
              <span className="variance">{report.variance}</span>
            </div>
            <p>Conclusion : {report.status}</p>
            <div className="flag-card">
              <h5>Reason: </h5>
              <ul>
                {report.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <span>Total Flaged: {report.totalFlags}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GenerateReport;
