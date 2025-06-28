import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { NotificationService } from './notification.services';

const getALLNotification = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['receiverId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const userId = req.user.id;
  const result = await NotificationService.getALLNotification(
    filters,
    options,
    userId
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Notifications fetched successfully',
  });
});

const getAdminNotifications = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['receiverId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await NotificationService.getAdminNotifications(
    filters,
    options
  );
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Admin Notifications fetched successfully',
  });
});

const getSingleNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationService.getSingleNotification(id);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Notification fetched successfully',
  });
});

const viewNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await NotificationService.viewNotification(id);
  sendResponse(res, {
    code: StatusCodes.OK,
    data: result,
    message: 'Notification viewed successfully',
  });
});

const deleteNotification = catchAsync(async (req, res) => {
  const { id } = req.params;
  await NotificationService.deleteNotification(id);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'Notification deleted successfully',
    data: {},
  });
});

const clearAllNotification = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await NotificationService.clearAllNotification(userId);
  sendResponse(res, {
    code: StatusCodes.OK,
    message: 'All notifications cleared successfully',
    data: {},
  });
});

export const NotificationController = {
  getALLNotification,
  getAdminNotifications,
  getSingleNotification,
  viewNotification,
  deleteNotification,
  clearAllNotification,
};
