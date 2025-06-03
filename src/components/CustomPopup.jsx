import { Modal } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useEffect } from 'react';

const CustomPopup = ({ visible, title, onClose }) => {
  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      className="success-popup"
    >
      <div className="text-center py-6">
        <CheckCircleFilled className="text-6xl text-green-500 mb-4" />
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">Operation completed successfully!</p>
      </div>
    </Modal>
  );
};

export default CustomPopup;
