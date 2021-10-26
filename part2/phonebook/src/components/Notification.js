const Notification = ({data}) => {
    if(!data.message) return null;

    return <p className={data.success ? 'notification-success' : 'notification-error'}>{data.message}</p>
}

export default Notification;