import axios from "axios";

/**
 * getall game data
 */
export async function getAllGame() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/game/get`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Game History
 */
// export async function getGameHistory({
//   id: id,
//   page: page,
//   pageSize: pageSize,
//   pullId: pullId,
//   crashPoint: crashPoint,
//   playerCount: playerCount,
//   totalAmount: totalAmount,
//   startDate: startDate,
//   endDate: endDate,
//   Minimun: Minimun,
//   Maximum: Maximum,
//   Operator: Operator,
// }) {
//   try {
//     const response = await axios.get(
//       // `${process.env.REACT_APP_LOCAL_URL}/game/history/${id}?page=${page}&limit=${pageSize}&pullId=${pullId}&crashPoint=${crashPoint}`,
//       `${process.env.REACT_APP_LOCAL_URL}/game/history/${id}?limit=${pageSize}&pullId=${pullId}&pullIdMin=${Minimun}&pullIdMax=${Maximum}&pullIdOperator=${Operator}&crashPoint=${crashPoint}&crashPointOperator=${Operator}&crashPointMin=${Minimun}&crashPointMax=${Maximum}&totalAmount=${totalAmount}&totalAmountOperator=${Operator}&totalAmountMin=${Minimun}&totalAmountMax=${Maximum}&playerCount=${playerCount}&playerCountOperator=${Operator}&playerCountMin=${Minimun}&playerCountMax=${Maximum}&startDate=${startDate}&endDate=${endDate}&sortBy=crashPoint&sortOrder=asc&page=${page}`,
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }
export const getGameHistory = async (params) => {
  const {
    id,
    data,
    page,
    limit,
    pullId,
    pullIdMin,
    pullIdMax,
    pullIdOperator,
    crashPoint,
    crashPointMin,
    crashPointMax,
    crashPointOperator,
    playerCount,
    playerCountMin,
    playerCountMax,
    playerCountOperator,
    totalAmount,
    totalAmountMin,
    totalAmountMax,
    totalAmountOperator,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = params;
// console.log("gameHistory..........",id);


  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/game/history/${id}`,
      {
        params: {
          page,
          data,
          limit,
          pullId,
          pullIdMin,
          pullIdMax,
          pullIdOperator,
          crashPoint,
          crashPointMin,
          crashPointMax,
          crashPointOperator,
          playerCount,
          playerCountMin,
          playerCountMax,
          playerCountOperator,
          totalAmount,
          totalAmountMin,
          totalAmountMax,
          totalAmountOperator,
          startDate,
          endDate,
          sortBy,
          sortOrder,
        },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Game Status
 */
export async function ChangeGameStatus({ gameId: gameId, body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/game/${gameId}/status`,
      body,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Game Information
 */
export async function getGameInformation({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/game/GameInformation/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Add Game
 */
export async function AddGame({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/game/add`,
      body,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
//game/edit/:gameId

// *  Edit Game

export async function UpdateGame({body:body, id: id}) {
  try {
    const response = await axios.put(`
      ${process.env.REACT_APP_LOCAL_URL}/game/edit/${id}`,
    body,{
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
}

// * OTP Generate

export async function OtpGenerate(body) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/game/generateOtp`,
      body, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    console.log("OTP Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in OTP Generation:", error);
    throw error;  
  }
}


// export async function OtpGenerate({ body: body}) {
//   try {
    
//     const requestBody = {
//       ...body,
//       // email,
//       email:"admin@gmail.com", 
//     };

//     console.log("Request payload:", requestBody);

//     const response = await axios.post(
//       `${process.env.REACT_APP_LOCAL_URL}/game/generateOtp`,
//       requestBody,
//       {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
    
//     console.error("Error generating OTP:", error.response?.data || error.message);
//     throw error;
//   }
// }
