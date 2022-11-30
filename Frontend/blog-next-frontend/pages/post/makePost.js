import ResponsiveAppBar from "../../resource/components/global/headerBar";
import axios from "axios";
import styles from "../../styles/Home.module.css";

const content = {
  key1: "value1",
  key2: "value2"
};

export default function makePost() {
    const handleChange = (e) => {
        let formData = new FormData();
        formData.append("data", JSON.stringify(content));
        formData.append("profile_picture", e.target.files[0]);
        axios.put("/api/update", formData).then(console.log).catch(console.log);
 };
    return (
    <>
        <div>
            <ResponsiveAppBar />
        </div>
        <div className={styles.container}>
            <input accept="*" type="file" onChange={handleChange} />
        </div>
    </>
    )
}
