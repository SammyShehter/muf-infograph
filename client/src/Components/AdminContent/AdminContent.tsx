export default function AdminContent({content}: any) {
    const show = content.filter((item: any) => item.active)
    return (
        <div className="content-wrapper content-wrapper--with-bg">
            {show.length ? (
                show[0].content
            ) : (
                <>
                    <h1 className="page-title">Dashboard</h1>
                    <div className="page-content">Content goes here</div>
                </>
            )}
        </div>
    )
}
