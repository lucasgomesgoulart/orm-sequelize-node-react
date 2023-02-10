import api from "../../api";
import { DatePicker, Space } from 'antd';
import { useState } from "react";
import { Spin } from 'antd';

const Reports = () => {
    const { RangePicker } = DatePicker;

    const [initialDate, setInitalDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);
    const [loading, setLoading] = useState(false);

    const downloadReport = async () => {
        setLoading(true);
        const response = await api.post('/getreport', {
            initialDate,
            finalDate
        });
        const csv = response.data.report;
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "report.csv";
        link.click();
        setLoading(false);
    };

    return (
        <div>
            <h1>Reports</h1>
            <Space direction="vertical" size={12}>
                <RangePicker onChange={(dates) => {
                    setInitalDate(dates[0]);
                    setFinalDate(dates[1]);
                }} />
            </Space>
            {loading ? <Spin size="large" /> : (
                <button onClick={downloadReport}>Download report</button>
            )}
        </div>
    );

}

export default Reports;