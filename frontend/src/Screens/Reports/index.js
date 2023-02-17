import api from "../../api";
import { DatePicker, Space } from 'antd';
import { useContext, useEffect, useState } from "react";
import { Spin } from 'antd';
import { Context } from '../../components/Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
const Reports = () => {

  const { authenticated } = useContext(Context)
  const { RangePicker } = DatePicker;
  const [initialDate, setInitalDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    if (!authenticated) {
      navigate('/unauthorizaded')
    }
  }, [])


  const downloadReport = () => {
    setLoading(true);
    api.post('/getreport', {
      initialDate,
      finalDate
    })
      .then(response => {
        const csv = response.data;
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "report.csv";
        link.click();
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <h1 className="title">Reports</h1>
        <Space direction="vertical" size={12}>
          <RangePicker onChange={(dates) => {
            setInitalDate(dates[0]);
            setFinalDate(dates[1]);
          }} />
        </Space>
        {loading ? (
          <Spin size="large" />
        ) : (
          <div>
            <button className="buttonSubimt" onClick={downloadReport}>Download report</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Reports;