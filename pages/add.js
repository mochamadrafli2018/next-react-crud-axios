export default function Add() {
  const submitNewData = () => {
    axios.post('http://localhost:5000/api',{
      disease,
      rulebase
    })
    .then(() => { setSuccessAddData(true) })
    .catch((err) => { setSuccessAddData(false) })
  }

  return (
    <div>
      <img src='https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9'></img>
      <form 
        onSubmit={submitNewData}
        className='border-2 border-blue-500 my-2 mx-auto p-3 rounded shadow w-2/5'
      >
        <h3 className='text-center font-bold text-xl'>Tambah atau Ubah Data</h3>
        <hr/>
        <div className='col my-1'>
          <label className='form-label mx-auto'>Nama Penyakit</label>
          <input className='form-control border-2 hover:border-blue-600 mx-auto rounded'
            type='text'  
            placeholder='Masukkan Nama Penyakit'
            value={disease} 
            onChange={(e) => {
              setDisease(e.target.value);
              setSuccessAddData(false);
            }}
          />
        </div>
        <div className='col my-1'>
          <label className='form-label mx-auto'>Gejala-gejala</label>
          <input className='form-control border-2 hover:border-blue-600 mx-auto rounded'
            type='text'
            placeholder='Masukkan Data Gejala-Gejala'
            value={rulebase} 
            onChange={(e) => {
              setRulebase(e.target.value);
              setSuccessAddData(false);
            }}
          />
        </div>    
        <div className="d-grid gap-2 mt-2">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        {successAddData === true && (
          <div className="alert alert-primary mt-1">Data berhasil di tambahkan</div>
        )}     
      </form>
    </div>
  )
}