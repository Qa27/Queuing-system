import { Button, DatePicker, Layout, Modal, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { Timestamp, addDoc, collection } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import "./AddNumber.css";
import moment from "moment";
import { Dayjs } from "dayjs";

const { Option } = Select;

export const AddNumber = () => {
  const navigate = useNavigate();
  const [openSTT, setOpenSTT] = useState<boolean[]>([]);
  const [open, setOpen] = useState(false);
  const [nameN, setNameN] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const onSubmitBtn = async () => {
    if (nameN && selectedDate && selectedTimeSlot) {
      const currentDate = new Date();
      const selectedDateTime = new Date(
        `${selectedDate.format("MM/DD/YYYY")} ${selectedTimeSlot}`
      );
      let sttNValue = "Waiting";
      if (selectedDateTime < currentDate) {
        sttNValue = "Skip";
      }
      await addDoc(collection(db, "number"), {
        nameN: nameN,
        timeN: Timestamp.fromDate(selectedDate.toDate()),
        timeSlotN: selectedTimeSlot,
        createdAt: Timestamp.now(),
        sttN: sttNValue,
      });
      navigate("/list_number");
    }
  };

  const createCustomSuffixIcon = (openState: boolean[]) => (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {openState.length === 0 ? (
        <path
          d="M1 1L7 7L13 1"
          fill="#FF7506"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        openState.map((isOpen) =>
          isOpen ? (
            <path
              d="M13 7L7 0.999999L1 7 M13 7L7 0.999999L1 7L13 7Z"
              fill="#FF7506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path d="M1 1L7 7L13 1" fill="#FF7506" />
          )
        )
      )}
    </svg>
  );

  const TimeSelectionModal = ({ open, onCancel }: any) => {
    const startTime = moment().hour(8).minute(0);
    const endTime = moment().hour(18).minute(0);
    const timeSlots: any[] = [];
    while (startTime <= endTime) {
      timeSlots.push(startTime.format("HH:mm"));
      startTime.add(15, "minutes");
    }

    return (
      <div>
        {timeSlots.map((timeSlot) => (
          <Button
            key={timeSlot}
            className={timeSlot === selectedTimeSlot ? "selected" : ""}
            onClick={() => {
              setSelectedTimeSlot(timeSlot);
            }}
          >
            {timeSlot}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="AD_title">Manage tickets</span>
          <div className="AN_box">
            <span className="AN_box_title">TAKE A NEW TICKET</span>
            <span className="AN_box_text">Customer service of choice</span>
            <div className="AN_dropdown">
              <Select
                suffixIcon={createCustomSuffixIcon(openSTT)}
                onDropdownVisibleChange={(openSTT: any) =>
                  setOpenSTT([openSTT as boolean])
                }
                value={nameN}
                onChange={(value: string) => {
                  setNameN(value);
                }}
              >
                <Option value="1">Choose a service</Option>
                <Option value="Cardiovascular examination">
                  Cardiovascular examination
                </Option>
                <Option value="Obstetrics - Gynecological examination">
                  Obstetrics - Gynecological examination
                </Option>
                <Option value="Dental checkup">Dental checkup</Option>
                <Option value="Ear, nose and throat examination">
                  Ear, nose and throat examination
                </Option>
                <Option value="Respiratory examination">
                  Respiratory examination
                </Option>
                <Option value="General examination">General examination</Option>
              </Select>
            </div>
            <div>
              <Button
                className="AN_back"
                type="primary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                className="AN_addD"
                onClick={() => setShowDatePicker(true)}
              >
                Get a ticket
              </Button>
              <Modal
                className="AN_btn_on"
                open={showDatePicker || open}
                onCancel={() => {
                  if (showDatePicker) {
                    setShowDatePicker(false);
                  } else if (open) {
                    setShowDatePicker(true);
                    setOpen(false);
                  }
                }}
                onOk={() => {
                  if (showDatePicker) {
                    setShowDatePicker(false);
                    setOpen(true);
                  } else if (open) {
                    setShowDatePicker(false);
                    setOpen(false);
                    onSubmitBtn();
                  }
                }}
                cancelText={showDatePicker ? "Cancel" : "Back"}
                okText={showDatePicker ? "Continue" : "Submit"}
              >
                {showDatePicker && (
                  <DatePicker
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                  />
                )}
                {open && (
                  <TimeSelectionModal
                    open={open}
                    onChange={(date: any) => {
                      setSelectedTimeSlot(date);
                    }}
                  />
                )}
              </Modal>
            </div>
          </div>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
