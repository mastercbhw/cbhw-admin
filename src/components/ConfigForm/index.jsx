import React, { useEffect, useState } from 'react'

const ConfigForm = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    updateData();
    return () => {
      setData(undefined);
    };
  }, [props.title, props.list, props.edit])

  // 更新数据
  async function updateData() {
    setLoading(true);
    setLoading(false);
    setData(data);
  }

  return (
    <div>
      表单
    </div>
  )
}

export default ConfigForm
