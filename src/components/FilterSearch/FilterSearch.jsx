import { Col, Form, Input, Modal, Row } from "antd";
import React from "react";
import GenderSelect from "../GenderSelect/GenderSelect";
import MajorList from "../MajorList/MajorList";

const FilterSearch = (props) => {
  const { onFinish, open, onOk, onCancel, form, onKeyPress } = props;

  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} okText="Search" title="Filter student">
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        onKeyPress={onKeyPress}
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="FPT ID" name="fptId">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="UOG ID" name="uogId">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="Person ID" name="personId">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <GenderSelect />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="Fullname" name="fullName">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <MajorList />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FilterSearch;
