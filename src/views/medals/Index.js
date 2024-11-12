import { useDispatch } from "react-redux";
import { getMedals } from "../../services/medalsService";
import { setMedalData } from "../../features/medals/medalSlice";
import { useEffect } from "react";
import { EmojiEvents } from "@mui/icons-material";
import MedalsInfo from "./MedalsInfo";


function Index() {
    const dispatch = useDispatch();

    useEffect(() => {
        GetMedal();
    }, [])

    const GetMedal = async () => {
        try {
            const response = await getMedals();

            dispatch(setMedalData(response));

            console.log("response Medal:::::", response);

        } catch (error) {
            console.error("Failed to Fetch logs: ", error);
        }
    };

    return (
        <div>
            <div className="bg-[#1a2c38] flex flex-col">
                <div className="text-white ml-[-0.1rem] bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5 mx-auto">
                    <EmojiEvents size={25} className="text-white text-3xl" />
                    <p className="text-2xl pr-10 py-3">Medals</p>
                </div>

                <div>
                    {/* <div className="flex justify-center items-center h-screen bg-[#f0f0f0]"> */}
                        <div className="w-1/2 xl:w-[30rem]  pt-2 justify-center max-w-screen-md xl:h-[320px] me-px bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto -mt-2 p-[10px] ml-auto">
                            <MedalsInfo />
                        </div>
                    {/* </div> */}

                </div>
            </div>
        </div>
    )
}
export default Index;