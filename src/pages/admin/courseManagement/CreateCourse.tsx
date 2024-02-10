/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import { useAddCourseMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";
import PHSelect from "../../../components/form/PHSelect";

const CreateCourse = () => {
    const [createCourse] = useAddCourseMutation();
    const { data: courses } = useGetAllCoursesQuery(undefined);

    const preRequisiteCoursesOptions = courses?.data?.map(item => ({
        value: item._id,
        label: item.title
    }))

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        const courseData = {
            ...data,
            code: Number(data.code),
            credits: Number(data.credits),
            isDeleted: false,
            preRequisiteCourses: data.preRequisiteCourses ? data?.preRequisiteCourses?.map(item => ({
                course: item,
                isDeleted: false
            })) : []
        }

        console.log(courseData);

        try {
            const res = await createCourse(courseData) as TResponse<any>;
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId })
            } else {
                toast.success(res.data.message, { id: toastId })
            }
        } catch (err) {
            toast.error('Something went wrong!', { id: toastId })
        }
    }

    return (
        <Flex justify="center" align="center">
            <Col span={10}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Title" />
                    <PHInput type="text" name="prefix" label="Prefix" />
                    <PHInput type="text" name="code" label="Code" />
                    <PHInput type="text" name="credits" label="Credits" />
                    <PHSelect mode="multiple" name="preRequisiteCourses" options={preRequisiteCoursesOptions} label="PreRequisite Courses" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;