import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
    const dispath = useDispatch();

    return bindActionCreators(actionCreators, dispath);
};

