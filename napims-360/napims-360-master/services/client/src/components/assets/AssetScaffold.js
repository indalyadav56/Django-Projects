import TableScaffold from "./TableScaffold"
import AddModal from "./AddAssetModal"
import useIsModal from "../../hooks/assets/useIsModal"
import useTypeQuery from "../../hooks/assets/useTypeQuery"
import { generateColumns } from "../../utility/Utils"
import Spinner from '@components/spinner/Loading-spinner'
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"

/**
 *
 * @param {AssetScaffoldProps} props
 */
function AssetScaffold(props) {
  const {
    tableTitle,
    addModalTitle,
    typeQueryName,
    addDocumentNode,
    listDocumentNode,
    saveMutationInputKey,
    linkItems,
    columnExceptions,
    listQueryDataKey,
    columnMap,
    options,
    addModalExceptions,
    onSaveMapValue
  } = props
  const { isModal, toggleModal } = useIsModal()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  const debouncedSearch = useDebounce(search, 1000)

  const client = useApolloClient()

  const { data: { __type: { fields = [] } = {} } = {}, loading: loadingType } = useTypeQuery({
    variables: { name: typeQueryName }
  })

  const { data, loading, refetch } = useQuery(listDocumentNode,  { variables: { page: page + 1, search: debouncedSearch }})

  const [add, { loading: saving }] = useMutation(addDocumentNode)


  const normalizedOptions = options.reduce((acc, curr) => {
      acc[curr.key] = async (term) => {
        try {
          const { data } = await client.query({ query: curr.documentNode, variables: { search: term } })
          const mapCb = typeof curr.option === 'function' ? curr.option : item => ({ label: item[curr.option.label], value: item[curr.option.value || "id"] })
          return data?.[curr.dataKey || curr.key]?.results?.map(mapCb)
        } catch (error) {
          return []
        }
      }
      return acc
  }, {})

  const saveForm = async (values) => {
    try {
      const { data } = await add({ variables: { [saveMutationInputKey]: onSaveMapValue(values) } })
      if (Object.values(data)[0].ok) {
        refetch()
        toggleModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTotalPages = () => {
    const size = Math.abs(data?.[listQueryDataKey]?.size || 1)
    const total = Math.abs(data?.[listQueryDataKey]?.total || 1)
    return Math.ceil(total / size)
  }

  const handlePageChange = ({ selected }) => {
    if (selected <= totalPages && selected >= 0) {
      setPage(selected)
    }
  }

  useEffect(() => {
    setTotalPages(getTotalPages)
  }, [data?.[listQueryDataKey]?.size])

  if (loading || loadingType) return <Spinner />

  return (
    <>
      <TableScaffold
        title={tableTitle}
        columns={generateColumns(fields, linkItems, columnExceptions)}
        data={columnMap ? data?.[listQueryDataKey].results.map(columnMap) : data?.[listQueryDataKey].results}
        toggleAddModal={toggleModal}
        currentPage={page}
        pageSize={data?.[listQueryDataKey]?.size || 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        search={search}
        setSearch={setSearch}
        loading={loading}
      />
      <AddModal
        title={addModalTitle}
        isOpen={isModal}
        fields={fields}
        toggle={toggleModal}
        saving={saving}
        onSave={saveForm}
        options={normalizedOptions}
        exceptions={addModalExceptions}
      />
    </>
  )
}

AssetScaffold.defaultProps = {
    columnExceptions: [],
    // columnMap: (item) => item,
    options: [],
    onSaveMapValue: (value) => value
    
}

export default AssetScaffold

/**
 * @typedef {{
 * tableTitle: string;
 * addModalTitle: string;
 * typeQueryName: string;
 * listDocumentNode: any;
 * addDocumentNode: any;
 * saveMutationInputKey: string;
 * listQueryDataKey: string;
 * columnMap: (item: any, index: number, items: any[]) => any;
 * linkItems: string;
 * columnExceptions: string[];
 * addModalExceptions: string[];
 * options: {key: string; documentNode: any; dataKey: string; option: {label: string; value: string} | (item: any) => {label: string, value: string}}[];
 * onSaveMapValue: (value: any) => any;
 * }} AssetScaffoldProps
 */
