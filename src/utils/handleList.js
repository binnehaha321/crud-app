import moment from "moment";

// department
export const handleDepartmentDataList = (departments = []) => {
  let departmentData = {};
  return departments?.map((department) => {
    departmentData = {
      key: department?.departmentId,
      departmentId: department?.departmentId,
      departmentName: department?.departmentName,
      description: department?.description,
    };
    return departmentData;
  });
};

// student
export const handleStudentDataList = (students) => {
  let studentData = {};
  return students?.map((student) => {
    studentData = {
      key: student?.fptId,
      fptId: student?.fptId,
      fullName: student?.fullName,
      majorId: student?.majorId?.majorCode,
      email: student?.email,
      gender: student?.gender,
      status: student?.status,
      dob: moment(student?.dob).format("DD-MM-YYYY"),
      isActive: student?.isActive,
    };
    return studentData;
  });
};
