import styled from 'styled-components'

export const Readercsv = styled.div`
    background-color: white;
    display: flex;
    flex-direction: row;
    margin-bottom: 10;
`

export const AcceptFile = styled.div`
    border: 1px solid #ccc;
    height: 45px;
    line-height: 2.5;
    padding-left: 10px;
    width: 80%;
    color: rgba(2,2,2,1);
    font-size: 18px;
`

export const ButtonRemove = styled.button`
    border-radius: 0;
    padding: 0 20px;
    color: white;
    background: red;
`

export const ButtonFile = styled.button`
  width: 20%;
  background: blue;
  color:white;
`

export const Zone = styled.div`
  background: white;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 20px;
`

export const FileZone = styled.div`
    background: linear-gradient(to bottom, #EEE, #DDD);
    border-radius: 20px;
    display: flex;
    height: 120px;
    width: 120px;
    position: relative;
    z-index: 10;
    flex-direction: column;
    justify-content: center
`

export const InfoZone = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 10px
`
export const SizeZone = styled.span`
    background: rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    margin-bottom: 0.5em;
    justify-content: center;
    display: flex;
`

export const NameZone = styled.span`
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  font-size: 12px;
  margin-bottom: 0.5em;
`
export const ProgressBarZone = styled.div`
    bottom: 14px;
    position: absolute;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`
export const RemoveZone = styled.div`
    height: 23px;
    position: absolute;
    right: 6px;
    top: 6px;
    width: 23px
`
