const Page = () => {
  return (
    <form method="" className="flex flex-col gap-2">
      <div className="flex justify-center">
        <label htmlFor='username'>Username:</label>
        <input id='username' type="text" name='username' />
      </div>
      <div className="flex justify-center">
        <label htmlFor='pw'>Password:</label>
        <input id='pw' type="text" name='password' />
      </div>
      <button>Log in</button>
    </form>
  )
}

export default Page;