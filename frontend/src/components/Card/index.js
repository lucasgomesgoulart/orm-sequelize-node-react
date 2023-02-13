import React from 'react';
import { Card } from 'antd'

const CardDash = ({ CardTitle }) => {
    return (
        <div>
            <Card
                headStyle={{ color: '#fff' }}
                title={CardTitle}
                bordered={false}
                style={{
                    width: '300px',
                    height: '55px',
                    backgroundColor: '#001529'
                }}
            />
        </div>
    );
};

export default CardDash;