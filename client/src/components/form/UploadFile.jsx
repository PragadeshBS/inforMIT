const UploadFile = ({ uploadFile }) => {
  return (
    <div>
      <h5>Attach a file</h5>
      <input
        type="file"
        className="my-3 form-control w-50"
        onChange={(e) => uploadFile(e)}
      />
    </div>
  );
};
export default UploadFile;
