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
        setLoading(false);
        console.log(response.data)
        download(response.data, 'reportUser.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    };

    function download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

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
};

export default Reports;
