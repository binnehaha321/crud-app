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

// major
export const handleMajorDataList = (majors) => {
  let majorData = {};
  return majors?.map((major) => {
    majorData = {
      key: major?.majorId,
      majorId: major?.majorId,
      majorCode: major?.majorCode,
      ename: major?.ename,
      vname: major?.vname,
    };
    return majorData;
  });
};

// honour
export const formatHonourList = (list = []) => {
  let data = {};
  data = list.map((item, index) => {
    return {
      key: index,
      fptId: item?.fptId,
      fullName: item?.fullName,
      majorName: item?.majorName,
      subjectCode: item?.subjectCode,
      termCode: item?.termCode,
      mark: item?.mark,
      numberSubjectStudiedInTheTerm: item?.numberSubjectStudiedInTheTerm,
      averageScore: item?.averageScore,
    };
  });
  return data;
};

// subject
export const handleSubjectDataList = (subjects) => {
  let subjectData = {};
  return subjects?.map((subject) => {
    subjectData = {
      key: subject?.subjectCode,
      subjectCode: subject?.subjectCode,
      subjectName: subject?.subjectName,
      description: subject?.description,
      replaceWith: subject?.replaceWith,
    };
    return subjectData;
  });
};

// user
export const handleUserDataList = (users) => {
  let userData = {};
  return users?.map((user) => {
    userData = {
      key: user?.userId,
      userId: user?.userId,
      email: user?.email,
      username: user?.username,
      fullName: user?.fullName,
      phoneNumber: user?.phoneNumber,
      roles: user?.roles,
    };
    return userData;
  });
};

// students in class
export const handleStudentInClassDataList = (students) => {
  let std_in_class = {};
  return students?.map((std, index) => {
    std_in_class = {
      key: std?.fptId,
      index: ++index,
      fptId: std?.fptId,
      fullName: std?.fullName,
      classCode: std?.classCode,
    };
    return std_in_class;
  });
};
