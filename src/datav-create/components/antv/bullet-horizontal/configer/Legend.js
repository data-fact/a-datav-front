/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/12/2.
 * Description:
 * Modified By:
 */
import React,{useState,useEffect} from 'react'
import {Row,Col,Switch,Radio,Input} from 'antd4'

export default function Legend({show,position,measureName,targetName,onChange}){

    let [mn,setMn] = useState(measureName)
    let [tn,setTn] = useState(targetName)

    useEffect(() => setMn(measureName),[measureName])
    useEffect(() => setTn(targetName),[targetName])

    return (
        <>
            <Row>
                <Col span={4}>显示</Col>
                <Col span={10}>
                    <Switch
                        size="small" checked={show}
                        onChange={show => onChange('show',show)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={4}>描述</Col>
                <Col span={20}>
                    <Row>
                        <Col span={6}>实际值:</Col>
                        <Col span={18}>
                            <Input
                                size="small" value={mn}
                                onChange={e => setMn(e.target.value)}
                                onBlur={e => onChange('measureName',e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>目标值:</Col>
                        <Col span={18}>
                            <Input
                                size="small" value={tn}
                                onChange={e => setTn(e.target.value)}
                                onBlur={e => onChange('targetName',e.target.value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={4}>位置</Col>
                <Col span={20}>
                    <Radio.Group
                        size="small" value={position}
                        onChange={e => onChange('position',e.target.value)}
                    >
                        <Radio.Button value="top">上</Radio.Button>
                        <Radio.Button value="bottom">下</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </>
    )
}