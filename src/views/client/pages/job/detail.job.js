import {job_detail} from "../../../../services/client/job.services";
import { useState, useEffect } from "react";
import { Button, Tag } from "antd";
import { show } from "../../../../actions/formApply";
import FormApply from "./apply";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
function JobDetail() {
    const param = useParams().slug;
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.checkLogin);
    const [infor, setInfor] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await job_detail(param);
            if(res.code === 200){
                setInfor(res.data);
            }else{
                setInfor({});
            }
        };
        fetchApi();
    }, []);
    return (
        <>
            {
                infor && (
                    <div className="job__detail">
                        <div className="job__title">
                            <h1>{infor.name}</h1>
                            {isLogin && <div><Button size="large" type="primary" onClick={() => dispatch(show(true))} block={false}>Ứng tuyển ngay</Button></div>}
                        </div>
                        <div className="job__language">
                            <span>Ngôn ngữ: </span>
                            {infor.tagInfor.map((item, index) => (
                                <Tag color="blue" key={index}>{item.name}</Tag>
                            ))}
                        </div>
                        <div className="job__city">
                            <span>Thành phố: </span>
                            {infor.cityInfor.map((item, index) => (
                                <Tag color="warning" key={index}>{item.name}</Tag>
                            ))}
                        </div>
                        <div className="job__salary">
                            Mức lương: <strong>{infor.salary}</strong>
                        </div>
                        <div className="job__name__city">
                            Tên công ty: <strong>{infor.companyInfor.name}</strong>
                        </div>
                        <div>Địa chỉ công ty: <strong>{infor.companyInfor.address}</strong></div>
                        <div>
                            Thời gian đăng bài: <strong>{moment(infor.createdAt).format("DD/MM/YYYY HH:mm:ss")}</strong>
                        </div>
                        <div>
                            <div>Mô tả công việc:</div>
                            {infor.description}
                        </div>
                    </div>
                )
            }
            {infor && <FormApply job={infor} />}
        </>
    );
}

export default JobDetail;