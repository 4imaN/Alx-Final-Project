import { useDispatch, useSelector } from "react-redux";
import { handleInitialState } from "../redux/slice/initialLoadSlice";
import { useEffect } from "react";
import { RootState } from "../redux/store";

const useInitialLoad = () => {
    const initialLoad = useSelector(
        (state: RootState) => state.handleInitialState.initialLoad
    );

    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(handleInitialState());
        }, 3000);
    }, []);
    return { initialLoad };
};

export default useInitialLoad;
