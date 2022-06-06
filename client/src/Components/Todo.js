export default function Todo(props) {
    const { string } = props;
    return (
        <div className='Todo'>
            {string}
            <button>Remove</button>
        </div>
    )
};