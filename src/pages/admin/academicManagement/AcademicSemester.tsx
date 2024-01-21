import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemester";

const AcademicSemester = () => {
    const { data } = useGetAllSemesterQuery(undefined);
    console.log(data);

    return (
        <div>
            <h1>This is academic semester component</h1>
        </div>
    );
};

export default AcademicSemester;