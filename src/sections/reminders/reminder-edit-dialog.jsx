import ReminderCreateDialog from './reminder-create-dialog';

const ReminderEditDialog = ({ reminder, open, onClose, handler }) => {
  return (
    <ReminderCreateDialog
      currentReminder={reminder}
      open={open}
      onClose={onClose}
      handler={handler}
    />
  );
};
export default ReminderEditDialog;
