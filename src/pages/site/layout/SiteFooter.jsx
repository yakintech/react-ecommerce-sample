import { Copyright } from '@mui/icons-material'
import { Container, Grid, Link, Typography } from '@mui/material'
import React from 'react'

function SiteFooter() {
  return (
    <>
     {/* Footer */}
     <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
            
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
    </>
  )
}

export default SiteFooter