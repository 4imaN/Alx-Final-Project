import CreateInstructorPage from "./components/CreateInstructorPage.tsx"
import Nav from "../../components/Nav.tsx"
import bg from "../../assets/appBg.png"

const createInstructor = () => {
    return (
        <div
            className="bg-cover bg-center w-full h-screen overflow-y-scroll bg-gray-50"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex flex-col h-full">
                <Nav />
                <div className="flex-1">
                    <CreateInstructorPage />
                </div>
            </div>
        </div>
    )
}

export default createInstructor
