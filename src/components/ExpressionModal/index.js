import { Modal, Radio, Form, Select, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../services/api';


import './expressionModal.css';

const ExpressionModal = (props) => {
    const defaultExpression = {phrase: '', meaning: '', description: '', category: ''};
    const {Option} = Select;

    const [title, setTitle] = useState('')
    const [type, setType] = useState('expressao');
    const [categoriesList, setCategoriesList] = useState([]);
    const [expression, setExpression] = useState(defaultExpression);
    const [category, setCategory] = useState({});

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        setTitle(props.edit ? 'Editar' : 'Adicionar');
        console.log('props.expression')
        console.log(props.expression)
        setExpression(props.expression ? props.expression : defaultExpression)
    }, [props.edit])

    function onTypeChange(e) {
        setType(e.target.value);
    }

    function getCategories() {
        api
            .get("/categories/")
            .then((res) => {
                console.log(res);
                const list = res.data.results.map(c => {
                    return <Option key={c.id} value={c.id}>{c.name}</Option>
                })
                setCategoriesList(list)
            })
            .catch(e => {
                console.error(e)
            })
    }

    function onSubmit() {
        if(props.edit) {
            api
                .put(`/expressions/${expression.id}/`, expression)
                .then(res => {
                    props.handleClose('Expressão alterada com sucesso!')
                    props.setVisible(false);
                    
                })
                .catch((error) => {
                    console.error(error);
                })
                
            } else if (type === 'categoria') {
                props.handleClose('Categoria adicionada com sucesso!')
                api
                .post("/categories/", category)
                .then(res => {
                    props.setVisible(false);
                })
                .catch(e => {
                    console.error(e);
                })
            } else {
                api
                .post("/expressions/", expression)
                .then(res => {
                  props.handleClose('Expressão adicionada com sucesso!')
                  props.setVisible(false)
              })
              .catch((error) => {
                console.error(error);
              });
        }
    }

    function onInputChange(input, value) {
        const values = {...expression};
        values[input] = value;
        setExpression(values)
    }

    return (
        <div>
            <Modal
                visible={props.visible}
                title={`${title} Expressão`}
                onCancel={() => props.setVisible(false)}
                onOk={() => onSubmit()}
                okText='Salvar'
            >
                {!props.edit ?
                    <Radio.Group onChange={onTypeChange} value={type} style={{'marginBottom': '20px'}}>
                        <Radio.Button value='expressao'>Expressão</Radio.Button>
                        <Radio.Button value='categoria'>Categoria</Radio.Button>
                    </Radio.Group>
                    :
                    null
                }
                {type === 'expressao' ?
                    <Form layout='vertical'>
                        <Form.Item
                            label='Expressão'
                        >
                            <Input 
                                value={expression.phrase}
                                onChange={(e) => onInputChange('phrase', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Tradução'
                        >
                            <Input 
                                value={expression.meaning}
                                onChange={(e) => onInputChange('meaning', e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Categoria (opcional)'
                        >
                            <Select
                                value={expression.category}
                                onChange={(e) => onInputChange('category', e)}
                            >
                                {categoriesList}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Exemplo (opcional)'
                        >
                            <Input 
                                value={expression.description}
                                onChange={(e) => onInputChange('description', e.target.value)}
                            />
                        </Form.Item>
                        
                    </Form>
                    :
                    <Form layout='vertical'>
                        <Form.Item
                            label='Nome'
                        >
                            <Input onChange={(e) => setCategory({name: e.target.value})} />
                        </Form.Item>

                    </Form>
                }
            

            </Modal>
        </div>
    )
}

export default ExpressionModal; 