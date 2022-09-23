import { AsyncPaginate } from 'react-select-async-paginate'
import styled from 'styled-components'

export const AsyncPaginateStyled = styled(AsyncPaginate)`
  text-align: left;
  display: flex;
  align-items: center;
  .Select__control {
    max-height: 10px;
    width: 100%;
    border: 1px solid #81980f;
    border-radius: 5px;
    cursor: pointer;
  }

  .Select__control:hover {
    border-color: #81980f;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
    text-align: left !important;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: #81980f;
  }
`
