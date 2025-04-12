import React, { useState } from 'react';
import {
    List,
    Card,
    Select,
    Radio,
    Space,
    Divider,
    Typography,
    Button,
    Input
} from 'antd';

import { SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title, Text } = Typography;

const Panel1 = ({
                       title = "아이템 목록",
                       items = [],
                       loading = false,
                       onItemSelect = () => {},
                       onFilterChange = () => {},
                       onSortChange = () => {},
                       onCategoryChange = () => {}
                   }) => {
    // 상태 관리
    const [selectedItem, setSelectedItem] = useState(null);
    const [sortOrder, setSortOrder] = useState("newest");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchText, setSearchText] = useState("");

    // 카테고리 옵션 (예시)
    const categoryOptions = [
        { label: "전체", value: "all" },
        { label: "카테고리 A", value: "category_a" },
        { label: "카테고리 B", value: "category_b" },
        { label: "카테고리 C", value: "category_c" }
    ];

    // 정렬 옵션
    const sortOptions = [
        { label: "최신순", value: "newest" },
        { label: "오래된순", value: "oldest" },
        { label: "이름순", value: "name" }
    ];

    // 아이템 선택 핸들러
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        onItemSelect(item);
    };

    // 카테고리 변경 핸들러
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        onCategoryChange(value);
    };

    // 정렬 변경 핸들러
    const handleSortChange = (value) => {
        setSortOrder(value);
        onSortChange(value);
    };

    // 검색 핸들러
    const handleSearch = (value) => {
        setSearchText(value);
        onFilterChange(value);
    };

    return (
        <Card
            title={<Title level={4}>{title}</Title>}
            extra={<Button type="link">더보기</Button>}
            style={{ width: '100%' }}
            bodyStyle={{ padding: '12px' }}
        >
            {/* 필터 및 검색 영역 */}
            <Space direction="vertical" style={{ width: '100%', marginBottom: '16px' }}>
                {/* 카테고리 선택 (라디오 버튼) */}
                <div>
                    <Text strong style={{ marginRight: '8px' }}>카테고리:</Text>
                    <Radio.Group
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        buttonStyle="solid"
                        optionType="button"
                        size="small"
                    >
                        {categoryOptions.map(option => (
                            <Radio.Button key={option.value} value={option.value}>
                                {option.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* 검색 입력 */}
                    <Input
                        placeholder="검색어 입력"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: '60%' }}
                        allowClear
                    />

                    {/* 정렬 선택 (셀렉트박스) */}
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
                        placeholder="정렬 기준"
                        style={{ width: '38%' }}
                        suffixIcon={<SortAscendingOutlined />}
                    >
                        {sortOptions.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            </Space>

            <Divider style={{ margin: '8px 0' }} />

            {/* 아이템 목록 */}
            <List
                itemLayout="horizontal"
                dataSource={items}
                loading={loading}
                locale={{ emptyText: "데이터가 없습니다" }}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        onClick={() => handleItemSelect(item)}
                        style={{
                            cursor: 'pointer',
                            background: selectedItem?.id === item.id ? '#f0f5ff' : 'transparent',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <List.Item.Meta
                            title={item.title || item.name}
                            description={item.description || `카테고리: ${item.category || '미분류'}`}
                        />
                        <div>{item.date || item.created_at}</div>
                    </List.Item>
                )}
                pagination={{
                    onChange: page => {
                        console.log('페이지 변경:', page);
                    },
                    pageSize: 5,
                    size: 'small',
                    hideOnSinglePage: true
                }}
            />
        </Card>
    );
};

export default Panel1;
