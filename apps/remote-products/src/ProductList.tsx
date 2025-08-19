import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Pagination,
  CardMedia,
  Backdrop,
  CircularProgress,
  Box,
} from "@mui/material";
// import './msw/browser';


type Product = { id: string; name: string; price: number; category: string; rating: number; image?: string; };
type Props = { featureFlags?: { showRatings?: boolean } };
type Pagination = { page: number; limit: number}

export default function ProductList({ featureFlags }: Props) {
  const [defaultAll, setDefaultAll] = useState<Product[]>([])
  const [all, setAll] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<'asc'|'desc'>('asc');
  const [paginate, setPagination] = useState<Pagination>({
    page: 1, limit: 20
  })
  const [loading, setLoading] = useState<boolean>(false)

  const categories = useMemo(() => ['all', ...Array.from(new Set(all.map(p => p.category)))], [all]);

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      
      const products = await res.json()
      setAll(products)
      setDefaultAll(products)
      setLoading(false)
    } catch (error) {
      console.log({ error })
      setLoading(false)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  const displayedItems = useMemo(() => {
    const indexOfLastItem = paginate.page * paginate.limit;
    const indexOfFirstItem = indexOfLastItem - paginate.limit;
    
    let dataSorted = [...all]
    if (sort === 'asc') {
      dataSorted.sort((a, b) => a.price - b.price)
    } else if (sort === 'desc') {
      dataSorted.sort((a, b) => b.price - a.price)
    }

    if (query !== "") {
      dataSorted = dataSorted.filter((s) => {
        return s.name.toLowerCase().includes(query)
      })
    }

    let currentItems = dataSorted.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems

  }, [all, paginate.page, sort, query])

  useEffect(() => {
    const filteredCategories = category === 'all' ? defaultAll : all.filter(s => s.category === category)
    setAll(filteredCategories)
    setPagination((prev) => {
      return {
        ...paginate,
        page: 1,
      }
    })
  }, [category])
  return (
    <div>
      {
        loading && <Backdrop
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      }
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center' }} role="region" aria-label="Filters">
        <input placeholder="Search products…" aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} />
        <select aria-label="Filter by category" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
        <select aria-label="Sort by price" value={sort} onChange={e => setSort(e.target.value as 'asc'|'desc')}>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
        <button onClick={() => { setQuery(''); setCategory('all'); setSort('asc'); }}>Reset</button>
      </div>
      <Box style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',alignItems: 'center', marginTop: 20}}>
        {
          !!displayedItems.length && displayedItems.map((s, indx: number) => {
            return <Card sx={{ maxWidth: 120,  minWidth: 150, marginTop: 3, marginBottom: 2}} key={indx}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={s.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {s.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {s.category} | ${s.price}
              </Typography>
            </CardContent>
          </Card>
          })
        }
      </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'justify-center', width: '100vw', marginTop: 30}}>
          <Pagination
            onChange={(e: any, value: number)=> setPagination({
              ...paginate,
              page: value
            })}
            page={paginate.page}
            count={Math.ceil(all.length / paginate.limit)} shape="rounded" />
        </Box>
    </div>
  );
}
