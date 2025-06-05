
import BASE_URL from "./config";
const Delete=async (id,module)=>{
        try {
            const response = await fetch(`${BASE_URL}/` + module+"/delete", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token'),
                },
                body: JSON.stringify({key:id}), 
            });

            const result = await response.json();
            if (result.success) {
                console.log("Data deleted sucessfully", result.data );
                return true;
            } else {
                alert("Failed to delete data || Access Denied"+ result.error);
                return false;
            }
        } catch (error) {
            alert("Error while deleting data:"+error);
            return false;
        }
}
export default Delete;